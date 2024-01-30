import readlineSync from 'readline-sync';

class VigenereCipher {
  private readonly alphabet: string; // El alfabeto utilizado para el cifrado
  private readonly key: string; // La clave utilizada para el cifrado

  constructor(alphabet: string, key: string) {
    this.alphabet = alphabet;
    this.key = key;
  }

  public encrypt(plaintext: string): string {
    const encryptedChars: string[] = []; // Inicializa un array para almacenar los caracteres cifrados

    for (let i = 0; i < plaintext.length; i++) {
      // Itera sobre cada caracter del texto sin cifrar
      const plainChar = plaintext[i]; // Obtiene el caracter en la posición 'i' del texto sin cifrar
      const keyChar = this.key[i % this.key.length]; // Obtiene el caracter de la clave correspondiente al índice actual del bucle
      const shift = this.alphabet.indexOf(keyChar); // Calcula el desplazamiento basado en la posición del carácter de la clave en el alfabeto
      const encryptedChar = this.shiftChar(plainChar, shift); // Cifra el caracter actual utilizando el desplazamiento calculado
      encryptedChars.push(encryptedChar);
    }

    return encryptedChars.join('').toUpperCase();
  }

  /**
   * Método para descifrar texto cifrado utilizando el cifrado de Vigenère.
   * @param ciphertext El texto cifrado a ser descifrado.
   * @returns El texto descifrado.
   */
  public decrypt(ciphertext: string): string {
    const decryptedChars: string[] = []; // Inicializa un array para almacenar los caracteres descifrados

    for (let i = 0; i < ciphertext.length; i++) {
      // Itera sobre cada carácter del texto cifrado
      const cipherChar = ciphertext[i]; // Obtiene el carácter en la posición 'i' del texto cifrado
      const keyChar = this.key[i % this.key.length]; // Obtiene el carácter de la clave correspondiente al índice actual del bucle
      const shift = this.alphabet.indexOf(keyChar); // Calcula el desplazamiento basado en la posición del carácter de la clave en el alfabeto
      const decryptedChar = this.shiftChar(cipherChar, -shift); // Descifra el carácter actual utilizando el desplazamiento negativo calculado
      decryptedChars.push(decryptedChar); // Agrega el carácter descifrado al array de caracteres descifrados
    }

    return decryptedChars.join('').toUpperCase();
  }

  /**
   * Método privado para desplazar un carácter dentro del alfabeto.
   * @param char El carácter a ser desplazado.
   * @param shift La cantidad de desplazamiento.
   * @returns El carácter desplazado.
   */
  private shiftChar(char: string, shift: number): string {
    const charIndex = this.alphabet.indexOf(char); // Obtiene el índice del carácter en el alfabeto
    if (charIndex === -1) return char; // Si el carácter no está en el alfabeto, retorna el mismo carácter

    const shiftedIndex =
      (charIndex + shift + this.alphabet.length) % this.alphabet.length; // Calcula el índice desplazado considerando el desplazamiento y el tamaño del alfabeto
    return this.alphabet[shiftedIndex]; // Retorna el carácter desplazado
  }
}

// Entrada de usuario
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Define el alfabeto

const msg = readlineSync.question('Introduzca el mensaje: '); // Solicita al usuario ingresar el mensaje
const key = readlineSync.question('Introduzca la clave: '); // Solicita al usuario ingresar la clave

const cipher = new VigenereCipher(alphabet, key); // Crea una instancia de

// Cifra el mensaje y guarda el resultado en 'encrypted_msg'
const encrypted_msg = cipher.encrypt(msg);

// Limpia la consola
console.clear();

// Imprime la palabra clave y el texto original
console.log('Palabra clave:', key);
console.log('Texto original:', msg);

// Inicializa las cadenas para mostrar el texto original, cifrado y la clave en formato de tabla
let mensajeOriginal = '';
let mensajeCifrado = '';
let clave = '';

let cont = 0;
// Itera sobre cada caracter del mensaje original
for (let i = 0; i < msg.length; i++) {
  // Si se ha alcanzado el final de la clave, reinicia el contador y agrega espacios en las cadenas
  if (cont == key.length) {
    cont = 0;
    mensajeOriginal += ' ';
    mensajeCifrado += ' ';
    clave += ' ';
  }

  // Si el caracter actual es un espacio, omítelo
  if (msg[i] === ' ') {
    continue;
  }

  // Agrega el caracter original, cifrado y la clave a las cadenas respectivas
  mensajeOriginal += msg[i];
  mensajeCifrado += encrypted_msg[i];
  clave += key[cont];
  cont++;
}

// Imprime las cadenas formateadas
console.log('\n' + mensajeOriginal);
console.log(mensajeCifrado);
console.log(clave + '\n');

// Imprime el mensaje cifrado y el mensaje descifrado
console.log('Mensaje cifrado:', encrypted_msg);
console.log('Mensaje descifrado:', cipher.decrypt(encrypted_msg));
