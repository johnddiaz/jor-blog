import dynamic from 'next/dynamic';

const names = ['DivisionGroupsDemo', 'CircularColorsDemo'];

const lazyComponents = names.reduce((all, name) => {
  all[name] = dynamic(() => import(`@/components/${name}`));
  return all;
}, {});

export { lazyComponents };
