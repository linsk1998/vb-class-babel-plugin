import type { NodePath, Scope, Visitor } from "@babel/traverse";
import type { ConfigAPI } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export = declare(function (babel: ConfigAPI) {
	babel.assertVersion(7);
	return {
		name: "vb-class",
		visitor: {
			ClassDeclaration(path: NodePath<t.ClassDeclaration>) {
				var node = path.node;
				path.replaceWith(t.variableDeclaration('var', [t.variableDeclarator(node.id, t.classExpression(node.id, node.superClass, node.body))]));
			},
			ClassExpression(path: NodePath<t.ClassExpression>) {
				var node = path.node;
				path.replaceWith(t.callExpression(
					t.functionExpression(
						null,
						[],
						t.blockStatement([
						]),
					),
					[],
				));
			}
		}
	};
});