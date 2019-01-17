import * as components from "./_components.json";

interface Cmp {
	name: String,
	path: String
}

const install = function( Vue: any ){	
  const arr = JSON.parse(JSON.stringify(components)).default;

  arr.forEach( (v: Cmp) => {
    Vue.component(v.name, () => import(`${v.path}`))
  })
}

export default { install }