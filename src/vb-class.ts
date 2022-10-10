import type { NodePath, Scope, Visitor } from "@babel/traverse";
import type { ConfigAPI, PluginPass } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import { types as t } from "@babel/core";

interface Options {
	loose?: boolean;
}
export = declare(function (babel: ConfigAPI, options?: Options) {
	babel.assertVersion(7);
	return {
		name: "vb-class",
		visitor: {
			// 类声明转化为类赋值
			ClassDeclaration(path: NodePath<t.ClassDeclaration>) {
				var node = path.node;
				path.replaceWith(
					t.variableDeclaration(
						'var',
						[t.variableDeclarator(node.id, t.classExpression(node.id, node.superClass, node.body))]
					)
				);
			},
			// 类赋值
			ClassExpression(path: NodePath<t.ClassExpression>, state: PluginPass) {
				var node = path.node;
				/** 类创建语句 */
				var body: Array<t.Statement> = [];
				// 创建类自运行函数
				// 如果有继承，超类要放在自运行函数的参数里
				var superClassId: t.Identifier;
				if (node.superClass) {
					if (node.superClass.type === 'Identifier') {
						superClassId = t.cloneNode(node.superClass);
					} else {
						superClassId = path.scope.generateUidIdentifier("Super");
					}
				}
				var result = t.callExpression(
					t.functionExpression(
						null,
						node.superClass ? [superClassId] : [],
						t.blockStatement(body),
					),
					node.superClass ? [t.cloneNode(node.superClass)] : [],
				);
				// 自运行函数声明为纯净，可以被代码优化
				annotateAsPure(result);
				path.replaceWith(result);
				/** 类标识，用来判断是不是匿名类 */
				var classId: t.Identifier;
				if (node.id) {
					classId = t.cloneNode(node.id);
				} else {
					classId = path.scope.generateUidIdentifier("Anonymous");
				}
				// 获取构造函数信息
				/** 构造函数 */
				var constructor: t.ClassMethod;
				var classBody = node.body;
				classBody.body.forEach((menber) => {
					if (menber.type === 'ClassMethod' && !menber.computed) {
						if (menber.kind === 'constructor') {
							// 找到构造函数
							constructor = menber;
						}
					}
				});
				/** 构造函数参数 */
				var constructorParams: Array<t.Identifier | t.Pattern | t.RestElement> = [];
				if(constructor){
					constructor.params.forEach((param)=>{
						if(param.type==='TSParameterProperty'){
							constructorParams.push(t.cloneNode(param.parameter));
						}else{
							constructorParams.push(t.cloneNode(param));
						}
					})
				}
				/** 构造函数语句 */
				var constructorStatements: Array<t.Statement> = [];
				// 如果有名函数，生成函数定义
				if (node.id) {
					body.push(
						t.functionDeclaration(
							t.cloneNode(classId),
							constructorParams,
							t.blockStatement(constructorStatements)
						)
					);
				} else {
					// 如果匿名函数，生成函数赋值
					body.push(
						t.variableDeclaration(
							'var',
							[t.variableDeclarator(
								t.cloneNode(classId),
								t.functionExpression(
									t.cloneNode(node.id),
									constructorParams,
									t.blockStatement(constructorStatements)
								)
							)]
						)
					);
				}
				if (node.superClass) {
					body.push(
						t.expressionStatement(
							t.callExpression(
								state.file.hub.addHelper("inheritsLoose"),
								[t.cloneNode(classId), t.cloneNode(node.superClass)],
							),
						),
					);
				}

				// 返回生成的函数
				body.push(t.returnStatement(t.cloneNode(classId)));
			}
		}
	};
});