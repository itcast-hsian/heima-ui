import * as configJson from "./config.json";
import Vue, { AsyncComponent } from 'vue'
import { RouteConfig, Route, NavigationGuard } from 'vue-router'

const config = JSON.parse(JSON.stringify(configJson)).default;
const load = function(path: any) {
  return () => import(`../pages/${path}.vue`)
};

const loopPath = function(list: any): any {
  return (function loop(rts: any) {

    return rts.map((item: any) => {
      const routePath = item.path;

      const route:RouteConfig = {
        path: routePath.slice(1),
        component: Vue.component(`docs-layout-parent`, function (resolve: any, reject: any) {
          resolve({
            data: () => ({routePath: routePath}),
            template: `
              <docs-layout :path="routePath">
                <IndexZhCN/>
              </docs-layout>
            `,
            components: {
              IndexZhCN: (): any => import(`../../components${routePath}/docs/index.zh_CN.md`)
            }
          })
        }),

        meta: {
          title: item.title
        },
        children: []
      }

      if (item.list) {
        route.children = loop(item.list);
      }

      return route;
    })
  })(list);
}

const registerRoutes = function() {
  const routes:RouteConfig[] = Object.keys(config).map((key: any) => {
    const nav = config[key];

    let route:RouteConfig = {
      path: nav.path,
      component: load(nav.component),
      children:[]
    }
    if (nav.groups) {
      nav.groups.forEach((group: any) => {
        const list = group.list;

        if (list) {
          route.children = [
            ...route.children,
            ...loopPath(list)
          ];
        }
      })
    }

    return route;
  })
  return routes;
}

const routes = registerRoutes();

export default routes;