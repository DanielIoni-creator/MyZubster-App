package com.myzubster.security

import android.content.Context
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient
import java.security.cert.X509Certificate
import javax.net.ssl.X509TrustManager
import okhttp3.Interceptor
import okhttp3.Response
import java.io.IOException

/**
 * SSLHelper - Configurazione SSL Pinning e sicurezza delle connessioni
 */
class SSLHelper(private val context: Context) {

    companion object {
        // Certificate Pins - Sostituisci con i tuoi certificati
        private val PINS = arrayOf(
            "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="  // Sostituisci con il pin del tuo certificato
        )
    }

    /**
     * Crea un OkHttpClient con SSL Pinning
     */
    fun createSecureClient(): OkHttpClient {
        val certificatePinner = CertificatePinner.Builder()
            .add("api.myzubster.io", *PINS)
            .build()

        return OkHttpClient.Builder()
            .certificatePinner(certificatePinner)
            .addInterceptor(SecurityInterceptor())
            .build()
    }

    /**
     * Interceptor per controlli di sicurezza aggiuntivi
     */
    private class SecurityInterceptor : Interceptor {
        @Throws(IOException::class)
        override fun intercept(chain: Interceptor.Chain): Response {
            val request = chain.request()
            // Aggiungi header di sicurezza
            val secureRequest = request.newBuilder()
                .header("X-Security-Version", "1.0")
                .header("X-Client-Type", "MyZubster-Android")
                .build()
            return chain.proceed(secureRequest)
        }
    }

    /**
     * TrustManager personalizzato (solo per debug)
     */
    fun createDebugTrustManager(): X509TrustManager {
        return object : X509TrustManager {
            override fun checkClientTrusted(chain: Array<out X509Certificate>?, authType: String?) {}
            override fun checkServerTrusted(chain: Array<out X509Certificate>?, authType: String?) {}
            override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
        }
    }
}
