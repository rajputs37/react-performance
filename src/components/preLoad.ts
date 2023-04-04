import { ComponentType, createElement, forwardRef, lazy, useRef } from "react";

export type PreloadableComponent<T extends ComponentType<any>> = T & {
  load: (beforeLoad?: Function, afterLoad?: Function) => Promise<T>;
  typeof: () => string;
};

export function preLazyload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): PreloadableComponent<T> {
  const ReactLazyComponent = lazy(factory);
  let PreloadedComponent: T | undefined;
  let factoryPromise: Promise<T> | undefined;

  const Component = forwardRef(function PreLazyload(props, ref) {
    const ComponentToRender = useRef(PreloadedComponent ?? ReactLazyComponent);
    return createElement(
      ComponentToRender.current,
      Object.assign(ref ? { ref } : {}, props) as any
    );
  });

  const PreLazyload = Component as any as PreloadableComponent<T>;

  PreLazyload.load = (beforeLoad, afterLoad) => {
    if (!factoryPromise) {
      beforeLoad && beforeLoad();
      factoryPromise = factory().then((module) => {
        PreloadedComponent = module.default;
        afterLoad && afterLoad();
        return PreloadedComponent;
      });
    }

    return factoryPromise;
  };

  PreLazyload.typeof = () => {
    return "preloadedComponent";
  };

  return PreLazyload;
}

export const isComponentPreLazy = (Component: any) => {
  return Component.typeof && Component.typeof() === "preloadedComponent";
};

export default preLazyload;
