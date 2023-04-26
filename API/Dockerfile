FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5184

ENV ASPNETCORE_URLS=http://+:5184

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["API/AlbumAPI.csproj", "API/"]
RUN dotnet restore "API/AlbumAPI.csproj"
COPY . .
WORKDIR "/src/API"
RUN dotnet build "AlbumAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AlbumAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AlbumAPI.dll"]
