import { cached, isUndef, isDef} from '../../../shared/util';

const normalizeEvent = cached(function (name) {
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;

    const once = name.charAt(0) === '~';
    name = once ? name.slice(1) : name;

    const capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;

    return {
        name,
        once,
        capture,
        passive
    };
});

export function updateListeners (on, oldOn, add, remove, createOnceHandler, vm) {
    let name, def, cur, old, event;

    for (name in on) {
        def = cur = on[name];
        old = oldOn[name];
        event = normalizeEvent(name);
    }

    for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name);
            remove(event.name, oldOn[name], event.capture);
        }
    }
}