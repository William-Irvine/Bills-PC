# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ["ReactApp3.Server.csproj", "./"]
RUN dotnet restore "ReactApp3.Server.csproj"

# Copy everything and build
COPY . .
RUN dotnet build "ReactApp3.Server.csproj" -c Release -o /app/build
RUN dotnet publish "ReactApp3.Server.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Render provides PORT environment variable
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "ReactApp3.Server.dll"]
```

### **Step 4: Create .dockerignore (Optional but Recommended)**

In the same folder as your Dockerfile, create `.dockerignore`:
```
bin/
obj/
*.user
*.suo
.vs/