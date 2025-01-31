import * as React from 'react';
import { ReactNode, CSSProperties, ElementType, MouseEventHandler, RefCallback } from 'react';
import { Props as Props$1 } from 'react-floater';
import { ValueOf, PartialDeep, Simplify, SetRequired } from 'type-fest';
import * as popper_js from 'popper.js';

declare const ACTIONS: {
    readonly INIT: "init";
    readonly START: "start";
    readonly STOP: "stop";
    readonly RESET: "reset";
    readonly PREV: "prev";
    readonly NEXT: "next";
    readonly GO: "go";
    readonly CLOSE: "close";
    readonly SKIP: "skip";
    readonly UPDATE: "update";
};
declare const EVENTS: {
    readonly TOUR_START: "tour:start";
    readonly STEP_BEFORE: "step:before";
    readonly BEACON: "beacon";
    readonly TOOLTIP: "tooltip";
    readonly STEP_AFTER: "step:after";
    readonly TOUR_END: "tour:end";
    readonly TOUR_STATUS: "tour:status";
    readonly TARGET_NOT_FOUND: "error:target_not_found";
    readonly ERROR: "error";
};
declare const LIFECYCLE: {
    readonly INIT: "init";
    readonly READY: "ready";
    readonly BEACON: "beacon";
    readonly TOOLTIP: "tooltip";
    readonly COMPLETE: "complete";
    readonly ERROR: "error";
};
declare const STATUS: {
    readonly IDLE: "idle";
    readonly READY: "ready";
    readonly WAITING: "waiting";
    readonly RUNNING: "running";
    readonly PAUSED: "paused";
    readonly SKIPPED: "skipped";
    readonly FINISHED: "finished";
    readonly ERROR: "error";
};

type Actions = ValueOf<typeof ACTIONS>;
type Events = ValueOf<typeof EVENTS>;
type Lifecycle = ValueOf<typeof LIFECYCLE>;
type Status = ValueOf<typeof STATUS>;
type AnyObject<T = any> = Record<string, T>;
interface Locale {
    back?: ReactNode;
    close?: ReactNode;
    last?: ReactNode;
    next?: ReactNode;
    open?: ReactNode;
    skip?: ReactNode;
}
type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
interface Styles {
    beacon: CSSProperties;
    beaconInner: CSSProperties;
    beaconOuter: CSSProperties;
    buttonBack: CSSProperties;
    buttonClose: CSSProperties;
    buttonNext: CSSProperties;
    buttonSkip: CSSProperties;
    options: Partial<StylesOptions>;
    overlay: CSSProperties;
    overlayLegacy: CSSProperties;
    overlayLegacyCenter: CSSProperties;
    spotlight: CSSProperties;
    spotlightLegacy: CSSProperties;
    tooltip: CSSProperties;
    tooltipContainer: CSSProperties;
    tooltipContent: CSSProperties;
    tooltipFooter: CSSProperties;
    tooltipFooterSpacer: CSSProperties;
    tooltipTitle: CSSProperties;
}
interface StylesOptions {
    arrowColor: string;
    backgroundColor: string;
    beaconSize: number;
    overlayColor: string;
    primaryColor: string;
    spotlightShadow: string;
    textColor: string;
    width?: string | number;
    zIndex: number;
}

type Listener = (state: State) => void;
type PopperData = Parameters<NonNullable<Props$1['getPopper']>>[0];
declare class Store {
    private beaconPopper;
    private tooltipPopper;
    private data;
    private listener;
    private store;
    constructor(options?: StoreOptions);
    getState(): State;
    private getNextState;
    private getSteps;
    private hasUpdatedState;
    private setState;
    addListener: (listener: Listener) => void;
    setSteps: (steps: Array<AnyObject>) => void;
    getHelpers(): StoreHelpers;
    getPopper: (name: 'beacon' | 'tooltip') => popper_js.default.Data | null;
    setPopper: (name: 'beacon' | 'tooltip', popper: PopperData) => void;
    cleanupPoppers: () => void;
    close: () => void;
    go: (nextIndex: number) => void;
    info: () => AnyObject;
    next: () => void;
    open: () => void;
    prev: () => void;
    reset: (restart?: boolean) => void;
    skip: () => void;
    start: (nextIndex?: number) => void;
    stop: (advance?: boolean) => void;
    update: (state: Partial<State>) => void;
}
type StoreInstance = ReturnType<typeof createStore>;
declare function createStore(options?: StoreOptions): Store;

type BaseProps = {
    beaconComponent?: ElementType<BeaconRenderProps>;
    disableCloseOnEsc?: boolean;
    disableOverlay?: boolean;
    disableOverlayClose?: boolean;
    disableScrollParentFix?: boolean;
    disableScrolling?: boolean;
    floaterProps?: Partial<Props$1>;
    hideBackButton?: boolean;
    hideCloseButton?: boolean;
    locale?: Locale;
    nonce?: string;
    showProgress?: boolean;
    showSkipButton?: boolean;
    spotlightClicks?: boolean;
    spotlightPadding?: number;
    styles?: PartialDeep<Styles>;
    tooltipComponent?: ElementType<TooltipRenderProps>;
};
type BeaconProps = Simplify<Pick<Props, 'beaconComponent' | 'nonce'> & BeaconRenderProps & {
    locale: Locale;
    onClickOrHover: MouseEventHandler<HTMLElement>;
    shouldFocus: boolean;
    styles: Styles;
}>;
type BeaconRenderProps = {
    continuous: boolean;
    index: number;
    isLastStep: boolean;
    size: number;
    step: StepMerged;
};
type Callback = (data: CallBackProps) => void;
type CallBackProps = {
    action: Actions;
    controlled: boolean;
    index: number;
    lifecycle: Lifecycle;
    size: number;
    status: Status;
    step: Step;
    type: Events;
};
type OverlayProps = Simplify<StepMerged & {
    debug: boolean;
    lifecycle: ValueOf<Lifecycle>;
    onClickOverlay: () => void;
}>;
type Props = Simplify<BaseProps & {
    callback?: Callback;
    continuous?: boolean;
    debug?: boolean;
    getHelpers?: (helpers: StoreHelpers) => any;
    run: boolean;
    scrollDuration?: number;
    scrollOffset?: number;
    scrollToFirstStep?: boolean;
    stepIndex?: number;
    steps: Array<Step>;
}>;
type State = {
    action: Actions;
    controlled: boolean;
    index: number;
    lifecycle: Lifecycle;
    size: number;
    status: Status;
};
type Step = Simplify<BaseProps & {
    content: ReactNode;
    disableBeacon?: boolean;
    disableSpotLight?: boolean;
    event?: string;
    floaterProps?: Props$1;
    hideFooter?: boolean;
    isFixed?: boolean;
    offset?: number;
    placement?: Placement | 'auto' | 'center';
    placementBeacon?: Placement;
    target: string | HTMLElement;
    title?: ReactNode;
}>;
type StepMerged = Simplify<SetRequired<Step, 'disableBeacon' | 'disableCloseOnEsc' | 'disableOverlay' | 'disableOverlayClose' | 'disableScrollParentFix' | 'disableScrolling' | 'event' | 'hideBackButton' | 'hideCloseButton' | 'hideFooter' | 'isFixed' | 'locale' | 'offset' | 'placement' | 'showProgress' | 'showSkipButton' | 'spotlightClicks' | 'spotlightPadding'> & {
    styles: Styles;
}>;
type StepProps = Simplify<State & {
    callback: Callback;
    continuous: boolean;
    debug: boolean;
    helpers: StoreHelpers;
    nonce?: string;
    shouldScroll: boolean;
    step: StepMerged;
    store: StoreInstance;
}>;
type StoreHelpers = {
    close: () => void;
    go: (nextIndex: number) => void;
    info: (state: State) => void;
    next: () => void;
    open: () => void;
    prev: () => void;
    reset: (restart: boolean) => void;
    skip: () => void;
};
type StoreOptions = Simplify<Props & {
    controlled: boolean;
}>;
type TooltipProps = {
    continuous: boolean;
    helpers: StoreHelpers;
    index: number;
    isLastStep: boolean;
    setTooltipRef: RefCallback<HTMLElement>;
    size: number;
    step: StepMerged;
};
type TooltipRenderProps = Simplify<BeaconRenderProps & {
    backProps: {
        'aria-label': string;
        'data-action': string;
        onClick: MouseEventHandler<HTMLElement>;
        role: string;
        title: string;
    };
    closeProps: {
        'aria-label': string;
        'data-action': string;
        onClick: MouseEventHandler<HTMLElement>;
        role: string;
        title: string;
    };
    primaryProps: {
        'aria-label': string;
        'data-action': string;
        onClick: MouseEventHandler<HTMLElement>;
        role: string;
        title: string;
    };
    skipProps: {
        'aria-label': string;
        'data-action': string;
        onClick: MouseEventHandler<HTMLElement>;
        role: string;
        title: string;
    };
    tooltipProps: {
        'aria-modal': boolean;
        ref: RefCallback<HTMLElement>;
        role: string;
    };
}>;

declare class Joyride extends React.Component<Props, State> {
    private readonly helpers;
    private readonly store;
    static defaultProps: {
        continuous: boolean;
        debug: boolean;
        disableCloseOnEsc: boolean;
        disableOverlay: boolean;
        disableOverlayClose: boolean;
        disableScrolling: boolean;
        disableScrollParentFix: boolean;
        getHelpers: undefined;
        hideBackButton: boolean;
        run: boolean;
        scrollOffset: number;
        scrollDuration: number;
        scrollToFirstStep: boolean;
        showSkipButton: boolean;
        showProgress: boolean;
        spotlightClicks: boolean;
        spotlightPadding: number;
        steps: never[];
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(previousProps: Props, previousState: State): void;
    componentWillUnmount(): void;
    /**
     * Trigger the callback.
     */
    callback: (data: CallBackProps) => void;
    /**
     * Keydown event listener
     */
    handleKeyboard: (event: KeyboardEvent) => void;
    /**
     * Sync the store with the component's state
     */
    syncState: (state: State) => void;
    scrollToStep(previousState: State): void;
    render(): React.JSX.Element | null;
}

declare namespace ReactJoyride {
  export { ACTIONS, type Actions, type AnyObject, type BaseProps, type BeaconProps, type BeaconRenderProps, type CallBackProps, type Callback, EVENTS, type Events, LIFECYCLE, type Lifecycle, type Locale, type OverlayProps, type Placement, type Props, STATUS, type State, type Status, type Step, type StepMerged, type StepProps, type StoreHelpers, type StoreOptions, type Styles, type StylesOptions, type TooltipProps, type TooltipRenderProps, Joyride as default };
}

export = ReactJoyride;