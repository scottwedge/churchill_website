## How to develop:
To compile using webpack: `npm run webpack`. This will move configured assets from src to dist including url rewriting for most of them.

dont forget, that you have to estimate css and js file urls, especially where they will be moved to in `dist/`.

## about styling:

Layout css classes do not have to be applied to any element. they only have to be linked in index.scss.
Layout rules are only about the POSITIONING and SIZE of main parts, e.g. header, footer, content block, intro page.
Name layout ids like the modules: for `m-header` the id is `m-header`.

Theme css classes, like for example `t-cards01` should be applied to the `body` element. Only then one can make sure that all theme styles will be applied correctly. The classes for the elements which are referenced by the theme should have the prefix `te-` standing for theme element. These classes are to be added to the classes already there because of modules etc.

Font css classes, like for example `f_fonts01` should also be applied to the `body` element.

THERE CAN ONLY BE ONE MODULE PER LAYER. That means `class="m-card m-tree"` can't be. Classes of module children that are not modules themselves don't have a prefix (`class="card"` for example).

Mixins can not rely on classes. They are classless.
