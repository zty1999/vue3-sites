declare type TargetContext = '_self' | '_blank';
declare interface AppRouteMeta {
  hideInMenu?: boolean,// 是否侧边栏显示
  notCache?: boolean,// 是否缓存
  title?: string,// 标题
  icon?: string,// 图标
  extraLink?:string,//外链地址
}
declare type Component<T = any> =
| ReturnType<typeof defineComponent>
| (() => Promise<typeof import('*.vue')>)
| (() => Promise<T>);

declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'component' | 'children' | 'meta'> {
  component?: Component;
  children?: AppRouteRecordRaw[];
  meta?:AppRouteMeta
}