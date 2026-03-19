# Aggiorna documentazione di progetto

Sei alla fine di una sessione di lavoro sul sito della Dott.ssa Federica Rota.
Aggiorna CLAUDE.md e i file memory per riflettere lo stato attuale del progetto.

## Istruzioni

### 1. Analizza la sessione
Leggi i file del progetto modificati di recente per capire cosa è cambiato:
- Controlla `C:\Dati\Claudecode\FEDERICA_ROTA\CLAUDE.md` (stato attuale)
- Controlla i file memory in `C:\Users\wondermike\.claude\projects\C--Dati-Claudecode-FEDERICA-ROTA\memory\`

### 2. Aggiorna CLAUDE.md se necessario
Modifica `C:\Dati\Claudecode\FEDERICA_ROTA\CLAUDE.md` solo se:
- Una milestone è stata completata → sposta da "successive" a "completate" con data odierna
- Nuovi segnaposto sono stati risolti → aggiorna la tabella segnaposto (aggiungi ~~strikethrough~~ e ✅)
- Nuove immagini sono state aggiunte → aggiorna la tabella immagini
- Nuovi file o cartelle sono stati creati → aggiorna la struttura cartelle

### 3. Aggiorna i file memory
Nella cartella `C:\Users\wondermike\.claude\projects\C--Dati-Claudecode-FEDERICA-ROTA\memory\`:

**Per ogni memoria esistente rilevante** (leggi prima il file):
- Aggiorna il contenuto se lo stato è cambiato
- Non duplicare informazioni già presenti

**Crea nuovi file memory solo se** hai appreso qualcosa di nuovo su:
- `user_*` — preferenze o conoscenze dell'utente
- `feedback_*` — correzioni o conferme sull'approccio di lavoro
- `project_*` — stato del progetto, decisioni, milestone
- `reference_*` — risorse esterne, URL, credenziali

Formato frontmatter obbligatorio:
```
---
name: Nome memoria
description: Descrizione breve — usata per decidere la rilevanza in sessioni future
type: user | feedback | project | reference
---

Contenuto. Per feedback/project: aggiungi **Why:** e **How to apply:**
```

### 4. Aggiorna MEMORY.md (index)
Modifica `C:\Users\wondermike\.claude\projects\C--Dati-Claudecode-FEDERICA-ROTA\memory\MEMORY.md`:
- Aggiungi link a nuovi file memory creati
- Aggiorna descrizioni di link esistenti se il contenuto è cambiato
- Mantieni l'indice conciso (max ~30 righe utili, escludi sezione `# currentDate`)

### 5. Conferma
Riporta brevemente:
- Cosa hai aggiornato in CLAUDE.md (o "nessuna modifica necessaria")
- Quali file memory hai creato o aggiornato (o "nessuna modifica necessaria")
