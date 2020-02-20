import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Digi-Expert-Plateforme")
    .setDescription("")
    .setVersion("1.0")
    .addTag("")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/doc", app, document);

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, "Bootstrap");
}
bootstrap();
