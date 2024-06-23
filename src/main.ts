import "./style.css";

interface ValidacionClave {
  esValida: boolean;
  error?: string;
}

const commonPasswords: string[] = [
  "password", "123456", "qwerty", "admin", "letmein", "welcome", "monkey", 
  "sunshine", "password1", "123456789", "football", "iloveyou", "1234567", 
  "123123", "12345678", "abc123", "qwerty123", "1q2w3e4r", "baseball", 
  "password123", "superman", "987654321", "mypass", "trustno1", "hello123", 
  "dragon", "1234", "555555", "loveme", "hello", "hockey", "letmein123", 
  "welcome123", "mustang", "shadow", "12345", "passw0rd", "abcdef", 
  "123abc", "football123", "master", "jordan23", "access", "flower", 
  "qwertyuiop", "admin123", "iloveyou123", "welcome1", "monkey123", 
  "sunshine1", "password12", "1234567890"
];

const formNode = document.getElementById('loginForm') as HTMLFormElement;

if (formNode) {
  formNode.addEventListener('submit', validarFormulario);
}

const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  const tieneMayuscula = /[A-Z]/.test(clave);
  const tieneMinuscula = /[a-z]/.test(clave);
  if (tieneMayuscula && tieneMinuscula) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
  }
};

const tieneNumeros = (clave: string): ValidacionClave => {
  const tieneNumero = /\d/.test(clave);
  if (tieneNumero) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe de tener números" };
  }
};

const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(clave);
  if (tieneEspecial) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe de tener caracteres especiales" };
  }
};

const tieneLongitudMinima = (clave: string): ValidacionClave => {
  if (clave.length >= 8) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
  }
};

const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
  const usernameInLowerCase = nombreUsuario.toLowerCase();
  const claveInLowerCase = clave.toLowerCase();
  if (!claveInLowerCase.includes(usernameInLowerCase)) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave no debe tener el nombre del usuario" };
  }
};

const tienePalabrasComunes = (clave: string, commonPasswords: string[]): ValidacionClave => {
  const claveInLowerCase = clave.toLowerCase();
  if (!commonPasswords.includes(claveInLowerCase)) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave no debe de contener palabras comunes" };
  }
};

const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  const validaciones = [
    tieneMayusculasYMinusculas(clave),
    tieneNumeros(clave),
    tieneCaracteresEspeciales(clave),
    tieneLongitudMinima(clave),
    tieneNombreUsuario(nombreUsuario, clave),
    tienePalabrasComunes(clave, commonPasswords)
  ];

  for (const validacion of validaciones) {
    if (!validacion.esValida) {
      return { esValida: false, error: validacion.error };
    }
  }

  return { esValida: true };
};

function validarFormulario(event: Event): void {
  event.preventDefault();

  const nombreUsuarioInput = document.getElementById('username') as HTMLInputElement;
  const claveInput = document.getElementById('password') as HTMLInputElement;

  if (nombreUsuarioInput && claveInput) {
    const nombreUsuario: string = nombreUsuarioInput.value;
    const clave: string = claveInput.value;

    const resultado: ValidacionClave = validarClave(nombreUsuario, clave, commonPasswords);

    if (resultado.esValida) {
      alert('La clave es válida');
    } else {
      alert(`Error: ${resultado.error}`);
    }
  }
}




