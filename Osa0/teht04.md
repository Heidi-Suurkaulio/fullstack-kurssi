Sekvenssikaavio kun käyttäjä luo uuden muistiinpanon example-apissa.

```mermaid
sequenceDiagram
participant selain
participant serveri

selain->>serveri: GET
serveri->>selain: 200 HTML document

```
