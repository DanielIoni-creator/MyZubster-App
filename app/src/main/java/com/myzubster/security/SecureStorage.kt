package com.myzubster.security

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import android.util.Base64

/**
 * SecureStorage - Gestione sicura dei dati sensibili (chiavi private, seed)
 * Basato su Android Keystore System
 */
class SecureStorage(private val context: Context) {

    companion object {
        private const val ANDROID_KEY_STORE = "AndroidKeyStore"
        private const val KEY_ALIAS = "myzubster_wallet_key"
        private const val TRANSFORMATION = "AES/GCM/NoPadding"
        private const val ANDROID_KEY_STORE_PROVIDER = "AndroidKeyStore"
    }

    private val keyStore: KeyStore = KeyStore.getInstance(ANDROID_KEY_STORE).apply {
        load(null)
    }

    /**
     * Genera o recupera la chiave AES per la crittografia
     */
    private fun getSecretKey(): SecretKey {
        if (keyStore.containsAlias(KEY_ALIAS)) {
            return keyStore.getKey(KEY_ALIAS, null) as SecretKey
        }

        val keyGenerator = KeyGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_AES,
            ANDROID_KEY_STORE_PROVIDER
        )

        val keyGenParameterSpec = KeyGenParameterSpec.Builder(
            KEY_ALIAS,
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
        )
            .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
            .setKeySize(256)
            .setUserAuthenticationRequired(true) // Richiede autenticazione (FaceID/Impronta)
            .setUserAuthenticationValidityDurationSeconds(30)
            .build()

        keyGenerator.init(keyGenParameterSpec)
        return keyGenerator.generateKey()
    }

    /**
     * Cifra un dato sensibile
     */
    fun encrypt(data: String): String {
        val secretKey = getSecretKey()
        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.ENCRYPT_MODE, secretKey)
        
        val encryptedData = cipher.doFinal(data.toByteArray(Charsets.UTF_8))
        val iv = cipher.iv
        
        // Combina IV + dati cifrati
        val combined = iv + encryptedData
        return Base64.encodeToString(combined, Base64.DEFAULT)
    }

    /**
     * Decifra un dato sensibile
     */
    fun decrypt(encryptedData: String): String {
        val combined = Base64.decode(encryptedData, Base64.DEFAULT)
        val iv = combined.sliceArray(0 until 12) // GCM usa IV di 12 byte
        val cipherText = combined.sliceArray(12 until combined.size)
        
        val secretKey = getSecretKey()
        val cipher = Cipher.getInstance(TRANSFORMATION)
        val gcmSpec = GCMParameterSpec(128, iv)
        cipher.init(Cipher.DECRYPT_MODE, secretKey, gcmSpec)
        
        val decryptedData = cipher.doFinal(cipherText)
        return String(decryptedData, Charsets.UTF_8)
    }

    /**
     * Salva un dato in modo sicuro
     */
    fun saveSecure(key: String, value: String) {
        val encrypted = encrypt(value)
        context.getSharedPreferences("secure_prefs", Context.MODE_PRIVATE)
            .edit()
            .putString(key, encrypted)
            .apply()
    }

    /**
     * Recupera un dato sicuro
     */
    fun loadSecure(key: String): String? {
        val encrypted = context.getSharedPreferences("secure_prefs", Context.MODE_PRIVATE)
            .getString(key, null) ?: return null
        return try {
            decrypt(encrypted)
        } catch (e: Exception) {
            null
        }
    }

    /**
     * Rimuove un dato sicuro
     */
    fun clearSecure(key: String) {
        context.getSharedPreferences("secure_prefs", Context.MODE_PRIVATE)
            .edit()
            .remove(key)
            .apply()
    }
}
