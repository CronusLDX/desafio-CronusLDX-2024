class RecintosZoo {
    constructor() {
        this.animais = [
            { especie: "LEAO", tamanho: 3, biomas: ["savana"], carnivoro: true },
            { especie: "LEOPARDO", tamanho: 2, biomas: ["savana"], carnivoro: true },
            { especie: "CROCODILO", tamanho: 3, biomas: ["rio"], carnivoro: true },
            { especie: "MACACO", tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            { especie: "GAZELA", tamanho: 2, biomas: ["savana"], carnivoro: false },
            { especie: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        ];

        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3, tamanhoTotal: 3 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1, tamanhoTotal: 2 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1, tamanhoTotal: 3 }] }
        ];
    }

    analisaRecintos(especie, quantidade) {
        const animal = this.animais.find(a => a.especie === especie);
        if (!animal) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0){
             return { erro: "Quantidade inválida" };
        }
        const recintosViaveis = [];

        this.recintos.forEach(recinto => {
            const espacoOcupado = recinto.animais.reduce((total, a) => total + a.tamanhoTotal, 0);
            let espacoLivre = recinto.tamanho - espacoOcupado;
        
            if (animal.biomas.includes(recinto.bioma) && espacoLivre >= (animal.tamanho * quantidade)) {
                const carnivorosNoRecinto = recinto.animais.some(a =>
                    this.animais.find(animal => animal.especie === a.especie).carnivoro
                );
        
                if (carnivorosNoRecinto && animal.carnivoro && recinto.animais[0].especie !== animal.especie) {
                    return;
                }
        
                if (animal.especie === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") return;
        
                
                if (animal.especie === "MACACO" && recinto.animais.length === 0) {
                  espacoLivre 
                }
                
                espacoLivre -= (animal.tamanho * quantidade);
                
                recintosViaveis.push({
                    descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`,
                    espacoLivre
                });
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
        return { recintosViaveis: recintosViaveis.sort() };
    }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo();

console.log(zoo.analisaRecintos("MACACO", 2));
console.log(zoo.analisaRecintos("UNICORNIO", 1));