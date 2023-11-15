/**
 * 云调用全链路模拟
 * https://mp.console.aliyun.com/cloudDev/env
 */
const spaceConfig = {
    spaceId: '89f58e69-45fc-45ed-9567-8e0f87cca68a',
    endpoint: 'https://api.bspapp.com',
    secret: 'rN8YYgyCWUCU9DAFLRKEUA==',
    // oss addr
    uploadEndpoint: 'bsppub.oss-cn-shanghai.aliyuncs.com',
    description: 'test desc',
};

const functionConfig = {
    // 初始类型
    triggerType: {
        task: 1,
        http: 2,
    },
    // 日志
    logger() {}
};

// 小程序端 AntOpenAPI
class MiniAntOpenClient {
    constructor() {
        const client = new MiniServerlessClient();
        this._client = new MiniAntOpenClient(client);

        // api context
        this.base = {};
        this.marketing = {};

        this.init();
    }

    init() { }

    request() {
        this._client.function.invoke({
            target: 'alipay-openapi',
            body: {
                method: 'getToken',
                params: {
                    $config: {
                        env: 'DEV',
                        notify: {
                            url: 'https://callback.com/save',
                        },
                    }
                }
            },
        });
    }
}

// 小程序 ServerlessClient
class MiniServerlessClient {
    constructor(options) {
        this.httpTransport = {
            request() {},
            decode() {},
            encode() {},
        };

        this.function = {
            invoke(params) {
                this.httpTransport.request({
                    endpoint: spaceConfig.endpoint,
                    body: {
                        method: 'serverless.function.runtime.invoke',
                        params: {
                            target: params.target,
                            body: params.body,
                        },
                    },
                    query: {},
                    method: 'POST',
                    serverlessHeaders: {
                        'x-serverless-spaceId': spaceConfig.spaceId,
                    },
                });
            }
        };
    }
}

// Serverless Gateway
class ServerlessGateway {

}

// 预置云函数, deps: [AntOpenSDK]
class AntOpenPresetCloudFunction {
    constructor() {
        // alipay open 平台的配置
    }
}

// 开放能力 SDK
class AntOpenSDK {
}
