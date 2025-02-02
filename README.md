# ✨ Discord Ekonomi Botu Altyapısı

Bu altyapı, Discord sunucunuz için gelişmiş bir ekonomi sistemi sunar. Discord.js v12 kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### 💰 Temel Ekonomi Komutları
- `!günlük` - Günlük ödül alın
- `!haftalık` - Haftalık ödül alın
- `!çalış` - Çalışarak para kazanın
- `!bakiye` - Bakiyenizi görüntüleyin
- `!transfer` - Başka bir kullanıcıya para transfer edin

### 🎮 Kumar & Bahis Komutları
- `!cf` - Yazı tura oyunu
- `!slot` - Slot makinesi
- `!kumar` - Kumar oynayın
- `!rulet` - Rulet oyunu

### ⚔️ Aktivite Komutları
- `!savaş` - Diğer oyuncularla savaşın
- `!düello` - Düello yapın
- `!çal` - Diğer oyunculardan para çalmayı deneyin

### 🏪 Market Sistemi
- `!market` - Market ürünlerini görüntüleyin
- `!satınal` - Marketten ürün satın alın
- `!envanter` - Envanterinizi görüntüleyin

### 🎣 Meslek Komutları
- `!balıktut` - Balık tutarak para kazanın
- `!madenkaz` - Maden kazarak para kazanın
- `!odunkır` - Odun keserek para kazanın

### 📊 Bilgi Komutları
- `!sıralama` - Sunucudaki en zenginleri görün
- `!gsıralama` - Global en zenginleri görün
- `!hesap` - Hesap bilgilerinizi görün
- `!yardım` - Tüm komutları listeleyin

## ⚙️ Kurulum (eğer Glitch kullanıyorsanız 1, 2, 3 ve 6. adımları atlayın)

1. Node.js 16.x sürümünü yükleyin
2. Projeyi klonlayın
3. Gerekli modülleri yükleyin:
```bash
npm install
```
4. ```.env``` dosyasına tokenınızı ekleyin:
```
TOKEN=bot_tokeniniz
```
5. ```config.json``` dosyasından prefixi belirleyin ve kendi ID'nizi ekleyin:
```json
{
    "prefix": "!",
    "sahip": "OWNER_ID"
}
```
6. Botu Başlatın:
```
node starr.js
```

# 📝 Gereksinimler
- Node.js v16
- Discord.js v12
# ⚠️ Önemli Notlar
- Bot Discord.js v12 sürümünü kullanmaktadır.
- Glitch ile uyumludur.
- Ekonomi verileri quick.db ile yerel olarak saklanır.
- Tüm para birimleri ve limitler ayarlanabilir.
# 🌟 Özellikler ve Limitler
- Günlük ödül: 500-1500 arası
- Haftalık ödül: 10000
- Çalışma kazancı: 100-600 arası
- Maximum kumar limiti: 200000
- Çalma başarı şansı: %40
- Savaş bekleme süresi: 30 dakika
# 🔒 Lisans
Bu proje özel lisans altında korunmaktadır. Sadece bireysel kullanıma izin verilir.
Dağıtım, paylaşım ve ticari kullanım yasaktır.

# 🤝 Destek
Herhangi bir sorun veya öneriniz için:

- [Discord Profilim](https://discord.com/users/761591334582616065)
- [Discord Sunucumuz](https://discord.gg/ekePqzFJUz)
- [GitHub Profilim](https://github.com/starrhub)
