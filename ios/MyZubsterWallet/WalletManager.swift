import Foundation
import LocalAuthentication

class WalletManager {
    static let shared = WalletManager()
    
    func createWallet() -> String {
        // Simula creazione wallet
        let address = "4" + UUID().uuidString.prefix(12)
        return String(address)
    }
    
    func authenticateWithFaceID(completion: @escaping (Bool) -> Void) {
        let context = LAContext()
        var error: NSError?
        
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics,
                                 localizedReason: "Autenticati per accedere al wallet") { success, _ in
                completion(success)
            }
        } else {
            completion(false)
        }
    }
}
