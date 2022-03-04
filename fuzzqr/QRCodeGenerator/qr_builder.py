
class qrbuilder:
    # ------------------------------------------------------------------------
    # IT APPS
    # ------------------------------------------------------------------------
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
        return payload # FIXME: I didnt find qrs (?) - F

    def qrbarcodereader(payload: str):
        return payload

    def io(payload: str):
        return payload

    def shein(payload: str):
        return "https://shein.onelink.me/" + payload + "?af_force_deeplink=true"

    # ------------------------------------------------------------------------
    # US APPS
    # ------------------------------------------------------------------------

    def instagram(payload: str):
        return "http://instagram.com/" + payload + "?utm_source=qr"

    def whatsapp(payload: str):
        # TODO: encode payload? reverse eng. needed here - F
        return "1@Gr2AkYnVD/66I5SwG9BM08UWvrQA2oqU5GuUcdiIp3A+tGLqPgiXcf+Hj3e7/gYkU1k/56ITQ/QM8g==,AJbtsqCjV7tmEM5UqT8nHvUnFT3/UIJx/X0f2kULAlw=,SC1mgNihOMah3cPYBsYxVg=="

    def snapchat(payload: str):
        return payload # FIXME: proprietary QR code (?) - F

    def paypal(payload: str):
        return "https://www.paypal.com/qrcodes/managed/" + payload + "?utm_source=consweb_more"
    
