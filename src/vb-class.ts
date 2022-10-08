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
			ClassDeclaration(path: NodePath<t.ClassDeclaration>) {
				var node = path.node;
				path.replaceWith(
					t.variableDeclaration(
						'var',
						[t.variableDeclarator(node.id, t.classExpression(node.id, node.superClass, node.body))]
					)
				);
			},
			ClassExpression(path: NodePath<t.ClassExpression>, state:PluginPass) {
				var node = path.node;
				var constructorParams: Array<t.Identifier | t.Pattern | t.RestElement> = [];
				var superStatements: Array<t.Statement> = [];
				var body: Array<t.Statement> = [];
				var classId = node.id;
				if (!classId) {
					classId = path.scope.generateUidIdentifier("Anonymous");
				}
				path.isFile();
				var superClassId: t.Identifier;
				if (node.superClass) {
					if (node.superClass.type === 'Identifier') {
						superClassId = t.cloneNode(node.superClass);
					} else {
						superClassId = path.scope.generateUidIdentifier("Super");
					}
					body.push(
						t.expressionStatement(
							t.callExpression(
								state.file.hub.addHelper("inheritsLoose"),
								[t.cloneNode(classId), t.cloneNode(node.superClass)],
							),
						),
					);
				}
				if (node.id) {
					body.push(
						t.functionDeclaration(
							t.cloneNode(classId),
							constructorParams,
							t.blockStatement(superStatements)
						)
					);
				} else {
					body.push(
						t.variableDeclaration(
							'var',
							[t.variableDeclarator(
								t.cloneNode(classId),
								t.functionExpression(
									t.cloneNode(node.id),
									constructorParams,
									t.blockStatement(superStatements)
								)
							)]
						)
					);
				}
				body.push(t.returnStatement(t.cloneNode(classId)));
				var result = t.callExpression(
					t.functionExpression(
						null,
						node.superClass ? [superClassId] : [],
						t.blockStatement(body),
					),
					node.superClass ? [t.cloneNode(node.superClass)] : [],
				);
				annotateAsPure(result);
				path.replaceWith(result);
			}
		}
	};
});