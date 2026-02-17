
# Build stage
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -Dquarkus.package.type=uber-jar

# Production stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*-runner.jar app.jar
COPY wait-for-it.sh wait-for-it.sh
EXPOSE 8080
CMD ["sh", "-c", "./wait-for-it.sh db:5432 -- java -jar app.jar"]
