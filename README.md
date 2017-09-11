# Send Sms to Via stop

## sign apk and optimize it for google play release  
you need a key to sign your apk  
if you dont have one you can generate it with the command  
```bash  
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000  
```  
### mgenerate the apk using the command  
```bash  
ionic cordova build --release android   
```  

### then sign and optimize the apk  
```bash  
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore via-sms-key.keystore android-release-unsigned.apk alias_name  
zipalign -v 4 android-release-unsigned.apk viaSms.apk  
```
