# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace/app
# Copy Maven wrapper and pom.xml first for better layer caching
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .
# Download dependencies (this will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring

# Create log directory and set proper ownership BEFORE switching to spring user
RUN mkdir -p /var/log/spring && \
    chown -R spring:spring /var/log/spring && \
    chmod 755 /var/log/spring

# Copy the built JAR from build stage
COPY --from=build /workspace/app/target/*.jar app.jar
RUN chown spring:spring /app.jar

# Switch to spring user
USER spring:spring

ENTRYPOINT ["java","-jar","/app.jar"]