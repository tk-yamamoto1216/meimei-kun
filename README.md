# Setup

```
npm install
npm start
```

# Deploy
```
npm run build
firebase deploy
```

# Trouble Shooting

## .env が反映されない

build し直してみてください

# URLs 

https://meimei-ar.web.app/

![hituji-568x384](https://user-images.githubusercontent.com/86940870/171137660-cf7901af-e741-498d-bdba-0de8f099ec0a.jpeg)

# Troubleshooting

## npm install できない

craco 入れたせいでできんくなった。
以下試してください。

```
npm install --save --legacy-peer-deps パッケージ名
```

https://qiita.com/koh97222/items/c46d1ef2a63b92bb6c15
