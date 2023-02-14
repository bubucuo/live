import {
  createContext,
  useSyncExternalStore,
  useContext,
  useReducer,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";

import {bindActionCreators} from "../redux-nut/bindActionCreators";

const ReactReduxContext = createContext();

export function Provider({store, children}) {
  return <ReactReduxContext.Provider value={store} children={children} />;
}

export function useSelector(selector) {
  const store = useContext(ReactReduxContext);

  const {getState, subscribe} = store;

  const [, forceUpdate] = useReducer((x) => 1, 0);

  const state = useSyncExternalStore(() => {
    subscribe(forceUpdate);
  }, getState);

  const selectedState = selector(state);

  return selectedState;
}

export function useDispatch() {
  const store = useContext(ReactReduxContext);

  return store.dispatch;
}

// !----------------------------------------------------
// HOC

export function connect(
  mapStateToProps = (state) => state,
  mapDispatchToProps
) {
  return (WrappedComponent) => (props) => {
    const store = useContext(ReactReduxContext);
    const {getState, dispatch, subscribe} = store;
    // store state
    const stateProps = mapStateToProps(getState());

    let dispatchProps = {dispatch};

    if (typeof mapDispatchToProps === "object") {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    } else if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
    }
    // 让函数强制更新的方法
    // const [, forceUpdate] = useReducer(x => x + 1, 0);
    // const [, forceUpdate] = useState({});

    const forceUpdate = useForceUpdate();
    // * useEffect _ _  DOM变更  effect执行(订阅)
    // * useLayoutEffect __   DOM变更-effect执行(订阅)

    // 订阅
    //

    useLayoutEffect(() => {
      //有订阅 一定要有取消订阅
      const unsubscribe = store.subscribe(() => {
        // todo 让函数组件更新
        forceUpdate();
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [store]);

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
  };
}

function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
}
