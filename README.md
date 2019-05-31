# cty-cli

some simple gadget

- cleanup all the specified directory from one `process.cwd()`, such as remove all node_modules which belong to ProjectA
- cleanup vscode`s files which remained after remove vcode on MacOs
- copy ip address

## Install

```bash
$ npm i cty-cli -g
```

## Usage

```bash
$ cty clean # remove node_moduls by default
$ cty clean -d node_modules 
$ cty clean -d node_modules -force # rm -rf node_modules
$ cty clean -d node_modules -f # rm -rf node_modules
```

```bash
$ cty cleanvscode
$ cty cleanvscode -force # rm -rf
$ cty cleanvscode -f # rm -rf
$ cty cleanvs -force # rm -rf
$ cty cleanvs -f # rm -rf
```

```bash
$ cty cphost
IP Address: 192.168.0.7
```

