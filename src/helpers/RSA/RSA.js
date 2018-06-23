require('cryptico-js')

class RSA
{
    constructor(frase)
    {
        this.bits = 1024
        this.frase = frase
        // console.log(cryptico.generateRSAKey(this.frase, this.bits))   
        // this.cryptico = new cryptico()
        this.clavePrivada = cryptico.generateRSAKey(this.frase, this.bits)

        this.clavePublica = cryptico.publicKeyString(this.clavePrivada)
        // console.log(cryptico)
    }   
    
    encriptarMensaje(texto)
    {
        let resultado = cryptico.encrypt(texto, this.clavePublica)
        if (resultado.status == 'success') 
        {
            return resultado.cipher    
        }
        return false
    }
    
    desencriptarMensaje(textoCifrado)
    {
        let resultado = cryptico.decrypt(textoCifrado, this.clavePrivada)
        if (resultado.status == 'success') 
        {
            return resultado.plaintext    
        }
        return false
    }
}
export default RSA;

