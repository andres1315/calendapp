const iniitalState={
  links:[
    {
      title:'calendar',
      componentName:'Calendar',
      active:true
    },
    {
      title:'about',
      componentName:'Cbout',
      active:false
    },
    {
      title:'contact',
      componentName:'/contact',
      active:false
    }
  ]
}

export const navBarSlice = ({
  name: 'navBar',
  iniitalState,
  reducer:{

  }
})