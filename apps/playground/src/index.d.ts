declare interface IOwlConfig {
    // 基础配置项
    devMode?: boolean; // 用于区分上报的环境, false: 正式环境，true: 测试环境
    project: string; // 必传，数据上报对应的项目名称
    webVersion?: string; // 自定义 Web 端版本号信息	
    pageUrl?: string; // 数据上报对应的页面 URL。使用 location.href 作为默认值，建议使用其他更易阅读的标识，如 location.host + location.pathname

    // 全链路日志
    enableLogTrace?: boolean; // 配置为 true 后开启请求日志全链路功能. (默认: false)
    enableStatusCheck?: boolean; // 配置为 true 后将采集准确的网络状态码，建议配置为 true 以配合 enableLogTrace 的使用. (默认: false)

    // 异常及请求拦截
    onErrorPush?: Function; // 异常上报前的拦截处理, 详见：https://km.sankuai.com/custom/onecloud/page/192155549
    onBatchPush?: Function; // 请求信息上报前的拦截处理, 详见：https://km.sankuai.com/custom/onecloud/page/192155549

    // 自动采集配置项
    autoCatch?: {
        page?: boolean; // 是否自动采集页面加载相关的性能指标. (默认: true)
        ajax?: boolean; // 是否自动采集 ajax 请求的性能数据和网络异常. (默认: true)
        fetch?: boolean; // 是否自动采集 fetch 请求的性能数据和网络异常. (默认: false)
        resource?: boolean; // 是否自动采集静态资源（图片、JS 和 CSS 等）的请求性能和加载异常. (默认: true)
        js?: boolean; // 是否自动采集 JS 错误. (默认: true)
        console?: boolean; // 是否自动采集 console.error 输出的错误. (默认: false)
        pv?: boolean; // 是否自动上报 PV，用于统计页面访问量. (默认: true)
    }

    page?: {
        sample?: number; // 性能指标上报时的采样率, 包括系统采集性能指标和自定义性能指标，默认值 0.5
        auto?: boolean; // 所有默认性能指标处理完成时是否自动进行上报。配合 addPoint 使用时应当配置为 false，addPoint 方法中会更新该配置为 true，目的是让默认性能指标和自定义性能指标能够合并上报，以减少上报请求. 默认: true. 
        delay?: number; // 发出性能指标上报请求之前的延迟时间。在 delay 时间内如果有新加入的自定义性能指标，将和之前的数据合并上报并重新开始计时，以减少上报请求. (默认: 0)
        sensoryIndex?: boolean; // 是否开启首屏时间 FST 的采集计算. (默认: true)
        disableSensoryImageIndex?: boolean; // FST 的计算结果是否要考虑首屏内图片加载完成的时间. (默认: false)
        interactToStopObserver?: boolean; // 是否在响应到用户交互时停止 DOM 变化监听. (默认: false)
        mutaStopTime?: number; // DOM 无变化的超时阈值。该阈值时间内没有监听到新的 DOM 变化时，停止 DOM 变化监听并开始处理 DOM 变更记录来计算 FST. (默认: 3000)
        logFirstScreen?: boolean; // 是否在 console 中输出 FST 计算过程中的相关数据信息. (默认: false)
        fstPerfAnalysis?: boolean; // 是否开启首屏性能指标的解析和上报. (默认: false)
        fstPerfSample?: number; // 首屏性能指标解析上报的采样率. (默认: 0.5)
        logSlowView?: boolean; // 是否采集上报慢访问的个案数据. (默认: false)
    }

    resource?: {
        sampleApi?: number; // ajax 请求的自动采集的采样率，以及使用 addApi 手动上报请求信息的采样率。同时作用于静态资源加载失败情况的采样率. (默认: 0.1)
        delay?: number; // 发出上报请求之前的延迟时间。在 delay 时间内新加入的请求数据，将和之前的数据合并上报. (默认: 1000)
        ignoreMTSIForbidRequest?: boolean; // 是否忽略安全部门反爬拦截导致的403请求. (默认: true)
        enableStatusCheck?: boolean; // 是否采集上报准确的http状态码, Owl默认采集上报的http状态码仅区分为200和500. (默认: false)
    }

    ajax?: {
        flag?: boolean; // 是否监控 ajax 请求耗时超过阈值.如果配置了 ajax.flag 为 true，且 ajax 请求的耗时超过了阈值 ajax.duration，则记录一个名称为 TIMEOUT_AJAX 的 ajaxError. (默认: false)
        duration?: number; // ajax 请求耗时的阈值，配合 ajax.flag 使用. (默认: 2000)
        invalid?: boolean; // 当 ajax 请求的 URL 地址不满足 resourceReg 规则时，是否上报一个名称为 INVALID_AJAX 的 ajaxError，错误堆栈为不满足规则的请求地址. (默认: true)
    }

    image?: {
        flag?: boolean; // 是否监控图片请求的资源大小或请求耗时超过阈值, 会产生 IMAGE_SIZE_EXCEED 和 IMAGE_DURATION_EXCEED 的 resourceError. (默认: false)
        fileSize?: number; // 图片请求资源大小的阈值，单位 kb. (默认: 100)
        duration?: number; // 图片请求耗时的阈值，单位 ms. (默认: 5000)
    }

    error?: {
        sample?: number; // 异常采集的采样率。同时作用于自动监听的异常和使用 addError 手动上报的异常. (默认: 1)
        combo?: boolean; // 是否合并上报 error.delay 时间内采集到的所有异常信息. (默认: false)
        delay?: number; // 当 error.combo 配置为 true 时，发出上报请求之前的延迟时间。在 delay 时间内新采集到的异常数据，将和之前的数据合并上报. (默认: 1000)
        maxNum?: number; // 在 maxTime 时间范围内，限制异常的上报请求数不超过 maxNum. (默认: 100)
        maxTime?: number; // 在 maxTime 时间范围内，限制异常的上报请求数不超过 maxNum. (默认: 60 * 1000)
        formatUnhandledRejection?: boolean; // 配置为 true 时，支持将采集到的 unhandledrejection 的错误名称格式化为：[unhandledrejection] Error Name. (默认: false)
    }

    metric?: {
        bombo?: boolean; // 是否合并上报该实例在 metric.delay 时间内设置的多个自定义指标. (默认: true)
        delay?: number; // 发出上报请求之前的延迟时间，配合 metric.combo 使用. (默认: 1500)
    }

    SPA?: {
        autoPV?: boolean; // 单页 pv 自动上报. (默认: false)
        getFST?: boolean; // 单页 FST 首屏时间. (默认: false)
    }
}

declare interface ErrObject {
    name: string;
    msg: string;
}

enum Level {
    error,
    warn,
    info
}

declare interface ErrOpts {
    category: string;
    level?: Level;
    tags?: Object;
    combo?: boolean;
}

declare interface Point {
    position: number; // 自定义性能指标的位置。可选值为 0 - 31 之间的整数，逐一对应测速点1 - 测速点32
    duration?: number; // 性能指标的时间值
    timeStamp?: number; // 表示当前的时间戳。duration 与 timeStamp 属性二选一，若未设置 duration，则使用 timeStamp 与 navigationStart 的差值作为性能指标的时间值
}

declare interface Api {
    name: string;
    networkCode: number;
    statusCode: number;
    responseTime: number;
    content: string;
}

declare interface MetricInst {
    setTags: (tags: Object) => void,
    setMetric: (name: string, value: number) => void,
    setExtraData: (msg: string) => void
}

declare interface Owl {
    start: (IOwlConfig) => void,
    config: (IOwlConfig) => void,
    addError: (err: string | ErrObject | Error, opts: ErrOpts) => void,
    addPoint: (point: Point) => void,
    addApi: (api: Api) => void,
    resetPv: (opts: { pageUrl: string }) => void,
    addLog: (msg: string, type: string) => void,
    createInstance: (opts: IOwlConfig) => Owl,
    setDimension: (obj: Object) => void,
    MetricManager: () => MetricInst,

    metricManager: MetricInst,
    cfgManager: any,
    logManager: any,
    pvManager: any,
    resManager: any,
    pageManager: any,
    errManager: any,
}

declare interface LxTracker {

}