// 为动态路由组件提供类型声明
declare module '../pages/program' {
  import { FC } from 'react';
  const Program: FC;
  export default Program;
}

declare module '../pages/program/[id]' {
  import { FC } from 'react';
  const ProgramDetail: FC;
  export default ProgramDetail;
} 