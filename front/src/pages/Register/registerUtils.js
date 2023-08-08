import { showNotify } from "../../Utils/utils";

export const getCep = async (cep) => {
    let adressJson
    if (cep.length == '8') {
        adressJson = await fetch(`http://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET'
        }).then((res) => res.json())
            .then((res) => res)
            .catch((err) => { console.log(err); showNotify("warning", "Não foi possível bsucar os dados do CEP."); return false })
    } else {
        adressJson = false
        showNotify('warning', 'cep deve conter pelo menos 8 digitos')
    }
    return adressJson
}

export const validateCpf = (cpf) => {
    if (cpf.length != 11) {
        return false;
    }

    if (/[^0-9]/g.test(cpf)) {
        return false;
    }

    let verifyDigits = [0, 0]
    for (let i = 0; i < 9; i++) {
        verifyDigits[i % 2] = verifyDigits[i % 2] * 10 + cpf[i]
    }
    verifyDigits[0] += verifyDigits[0] % 11 > 9 ? 1 : 0
    verifyDigits[1] += verifyDigits[1] % 11 > 9 ? 1 : 0

    return cpf[9] == verifyDigits[0] && cpf[10] == verifyDigits[1]
}