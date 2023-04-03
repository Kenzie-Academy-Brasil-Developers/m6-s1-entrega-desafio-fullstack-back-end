import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const cors = require("cors");
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.use(cors());
	const config = new DocumentBuilder()
		.setTitle("Clients and Contacts API")
		.setDescription(
			"This Api permits a client to create a list of contacts"
		)
		.setVersion("1.0")
		.addTag("cats")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(3001);
}
bootstrap();
