FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["ReactApp3.Server.csproj", "./"]
RUN dotnet restore "ReactApp3.Server.csproj"

COPY . .
RUN dotnet build "ReactApp3.Server.csproj" -c Release -o /app/build
RUN dotnet publish "ReactApp3.Server.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "ReactApp3.Server.dll"]