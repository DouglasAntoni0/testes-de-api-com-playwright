export function gerarULID() {
    const ALFABETO = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

    function codificarTempo(timestamp, tamanho = 10) {
        let resultado = "";

        for (let i = 0; i < tamanho; i++) {
            resultado = ALFABETO[timestamp % 32] + resultado;
            timestamp = Math.floor(timestamp / 32);
        }

        return resultado;
    }

    function gerarParteAleatoria(tamanho = 16) {
        const bytes = new Uint8Array(tamanho);
        crypto.getRandomValues(bytes);

        return Array.from(
            bytes,
            byte => ALFABETO[byte % 32]
        ).join("");
    }

    const timestamp = Date.now();

    return codificarTempo(timestamp) + gerarParteAleatoria();
}
