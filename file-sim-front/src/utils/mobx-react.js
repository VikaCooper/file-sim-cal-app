import { observer as _observer, inject as _inject } from 'mobx-react';
// 封装mobx的inject与observer
export function inject(...args) {
  return componentClass => _inject(...args)(_observer(componentClass));
}

export function observer(...args) {
  return _observer(...args);
}
