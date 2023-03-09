# dockerized
--docker-compose.yml
services are client server worker nginx
client has image link and size limit to download mem_limit? and the name of host?
server and worker has same with env variables?
nginx has ports? instead of env
--docker-compose-dev.yml
new services redis api(renamed?) and new config to all existing one
--worker
keys has env
index makes redisclient and makes a duplicate of it. Also has fib function. ?? parameters. simple docker files.
--server
keys with envs. express, postgres, redis, express. here redis is for wesite value storing. simple docker files
--nginx
docker and conf files
--client
normal docker files and public dir and conf
-src
normal react page