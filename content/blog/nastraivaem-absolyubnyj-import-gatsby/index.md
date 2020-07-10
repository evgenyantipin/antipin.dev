---
title: Настраиваем абсолютные импорты Gatsby.js
date: "2020-07-10T23:46:37.121Z"
description: "Hello World"
category: gatsby
---

Работая с Gatsby проектом вместо того, чтобы писать import SEO from '../../components/seo'
каждый раз ты можешь просто написать import Seo from 'components/seo'

Для этого нужно добавить в файл gatsby-node.js следующий код:

```js
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}
```
