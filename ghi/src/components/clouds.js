import * as klouds from "klouds";

let makeClouds = () => {
  klouds.create({
      selector: '#my-canvas'
    })
}
export { makeClouds }
