# ByteNews

## Visão do Projeto

ByteNews é um projeto que visa fornecer aos utilizadores uma plataforma online para ler, guardar e pesquisar notícias de acordo com seus interesses. Também permite aos autores publicar suas próprias notícias e oferece ao administrador controle total sobre o website.

## Executar Localmente

Para executar a aplicação, é necessário seguir as etapas em dois terminais:

### Primeiro Terminal:

```bash
pip install -r requirements.txt
cd api/
python3 manage.py flush
# insert data
python3 manage.py create_admin_user
python3 manage.py init_data
python3 manage.py runserver
```

### Segundo Terminal:
```bash
cd News_Frontend
npm install
ng serve
```

Acesse a aplicação em: `localhost:4200`

## Deploy

A aplicação pode ser acessada através do link: [https://bytenews.netlify.app/login](https://bytenews.netlify.app/login)

**Backend:**

Todo o backend e API foram implantados no pythonanywhere e podem ser acessados por exemplo através de: [https://rafa548.pythonanywhere.com/login](https://rafa548.pythonanywhere.com/login)

**Frontend:**

O frontend foi carregado utilizando o site netlify.com. Todos os dados já estão inseridos na aplicação web.

## Informações de Login

**Admin:**

- Username: admin
- Password: admin

**Leitores**

- Username: Jrm
- Password: jrm

**Autores:**

- Username: Mgz_001
- Password: Mgz_001

## Feito por

- Miguel Cruzeiro 107660
- Rafael Vilaça 107476
- Diogo Silva 107647