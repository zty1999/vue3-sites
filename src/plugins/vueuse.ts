import { MotionPlugin } from "@vueuse/motion";
import { App } from "vue";



export function setupVueUse(app: App<Element>){
  app.use(MotionPlugin)
}