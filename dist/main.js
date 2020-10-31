"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("/v1/api");
    const options = new swagger_1.DocumentBuilder()
        .setTitle('PowerBank API')
        .setDescription('Power Bank Api is a monolithic-based application service library.')
        .setVersion('1.0')
        .addTag('Powerful API')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('doc', app, document);
    console.log(process.env);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map