
class qrbuilder:
    # ------------------------------------------------------------------------
    # IT APPS
    # ------------------------------------------------------------------------
    
    def standard(payload: str): # This is for standard tests
        return payload

    def wallpop(payload: str):
        return payload

    def posteid(payload: str):
        return "https://secureholder.mobile.poste.it/jod-secure-holder/qrcodeResolver/" + payload
    
    def satispay(payload: str):
        return "https://www.satispay.com/app/pay/shops/" + payload + "?amount=1"

    def tiktok(payload: str):
        return "https://vm.tiktok.com/" + payload

    def telegram(payload: str):
        return "tg://login?token=" + payload

    def zoom(payload: str):
        return payload # The QR code simply contain the meeting's invitation URL

    def qrbarcodereader(payload: str):
        return payload

    def io(payload: str):
        return payload

    def shein(payload: str):
        return "https://shein.onelink.me/" + payload + "?af_force_deeplink=true"

    def ridemovi(payload: str):
        # example of correct payload: http://ridemovi.com/?bn=IB12A00232&p=1
        return "http://ridemovi.com/?bn=" + payload + "&p=1"

    # ------------------------------------------------------------------------
    # US APPS
    # ------------------------------------------------------------------------

    def instagram(payload: str):
        return payload # "http://instagram.com/" + payload + "?utm_source=qr"

    def instagram260(payload: str):
        return "http://instagram.com/" + payload + "?utm_source=qr"

    def whatsapp(payload: str):
        # TODO: encode payload? reverse eng. needed here - F
        return payload

    def snapchat(payload: str):
        return payload # FIXME: proprietary QR code (?) - F

    def paypal(payload: str):
        return "https://www.paypal.com/qrcodes/managed/" + payload + "?utm_source=consweb_more"

    def twitter(payload: str):
        return "https://twitter.com/" + payload
    
    def discord(payload: str):
        return payload # "https://discord.gg/" + payload
    
    def ebay(payload: str):
        return "https://ebay.com/str/" + payload
    
    def postepay(payload: str):
        return payload # "https://ppayapp.mobile.poste.it/jod-mobile-server/qrcs/bp/access/v1/?clusterID=1&tranId=" + payload
    
    def bancoposta(payload: str):
        return payload # "https://ppayapp.mobile.poste.it/jod-mobile-server/qrcs/bp/access/v1/?clusterID=1&tranId=" + payload

    def ucbrowser(payload: str):
        return payload
        
    def broadlink(payload: str):
        return payload

    def chrome(payload: str):
        return payload
        
    def facebook(payload: str):
        return "https://facebook.com/qr?id=" + payload
        
    def messages(payload: str):
        return "https://support.google.com/messages/?p=web_computer#?c=" + payload
        
    def verificac19(payload: str):
        return payload

