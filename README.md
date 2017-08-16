接口地址以及说明
--------------

### 一、接口地址
+ 开发环境 地址: `http://127.0.0.1:3000/`
+ 测试环境 地址: `http://127.0.0.1:3000/`
+ 生产环境 地址: `http://127.0.0.1:3000/`
+ 接口文档 地址: `http://127.0.0.1:3000/`

### 二、项目目录结构

```text
|____README.md      # 项目说明文件
|____app.js         # 入口文件
|____Dockerfile     # Doker配置文件
|____build.sh       # 项目Doker版本发布
|____gulpfile.js    # gulp配置文件
|____k8s.yaml       # k8s配置文件
|____package.json   # 模块依赖文件
|____.gitlab-ci.yml # CI配置文件
|____config         # 所有静态配置文件
| |____environments # 环境配置文件
| |____*.js         # production dev test
|____common         # 工程公共模块及方法
| |____*.js         # mongodb mysql elasticserch redis 认证 队列 代理 个推等
|____api            # 接口目录
| |____controllers  # 控制层 
| | |____*.js       # 包括 前置 后置器 可靠性验证等
| |____middlewares  # 中间件
| | |____*.js       # 认证 签名 白名单等
| |____services     # 服务层
| | |____*.js       # 数据交互
| |____protocol     # 协议约定
| | |____*.js       # 可靠性验证 统一输入/输出
|____lib            # 统一封装模块
| |____*.js         # 目前只包含API钩子函数
|____models         # 数据模型
| |____schemas      # 定义表集合
| | |____*.js       # 定义类方法 对象方法 表关系等
|____schedules      # 计划任务
| |____*.js         # 定时推送 刷新等
|____data           # 保存临时数据
| |____*.*          # 临时导出统计数据 如码表等
|____test           # 单元测试
| |____*.js         # 测试文件
|____node_modules   # 略
| |____*.js         # 略
|____logs           # 略
| |____*.*          # 略
|____scripts        # 略
| |____*.*          # 略
|____bin            # 略
| |____*.*          # 略
```

### 三、接口返回数据说明

三部分，如下:

``` text
// SUCCESS
{
    code: 0,
    message: '请求成功',
    data: {obj}/[arr], 	// 返回DATA
}
// FAIL
{
    code: int, 		// 具体的报错码
    message: str,   // 具体的报错信息
    data: {}/[], 	// 对应成功状态下的DATA类型
}

```

### 四、EXAMPLES

```text
cnpm install 

npm run start

curl http://127.0.0.1:3000/fetch/user/optional
```
