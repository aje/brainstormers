import {hookstate, useHookstate} from "@hookstate/core";

const toggles = hookstate({
	userSidebar: false,
	notificationSidebar: false,
	profileSidebar: false,
	loginPopper: false,
});

const wrapState = s => ({
	get: name => s.value[name],
	getAll: () => s.value,
	toggle: name => s.set(p => ({...p, [name]: !p[name]})),
	toggleOn: name => s.set(p => ({...p, [name]: true})),
	toggleOff: name => s.set(p => ({...p, [name]: false})),
});

export const useGlobalToggle = () => wrapState(useHookstate(toggles));

export const selectedUserState = hookstate(null);
