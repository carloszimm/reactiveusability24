# Operators' Frequency Script
To compute the frequency of operators of the participants' solutions, we developed a simple script that uses [ESQuery](https://github.com/estools/esquery)
to query the AST of analyzed source codes generated by [Esprima](https://github.com/jquery/esprima).

## Execution
### Requirements
* Node.js v.18 or above

Before execution of the script, the following command must be issued in a terminal to download the dependencies:
```sh
npm install
```

Also, all the solutions (source codes) are placed under `/solutions/[API_name]/[task_number]`, where `[API_name]` is the name of the analyzed APIs/libraries
(baconjs and rxjs) and `[task_number]` is the task identifier varying between 1 to 5.

### Running

The script can be run with the following command:
```sh
node index
```

## Results

The results are generated inside the folder `/results` as CSV files. At the first level of `/results`, there are two files, one with the overall frequency
of the operators from bacon.js (frequencies_baconjs.csv) and one with the operators of rxjs (frequencies_rxjs.csv). Additionally, one can find subfolders called
`baconjs` and `rxjs` detailing the counting according to the tasks' perspectives (e.g., the counting of operators in task 1 of RxJS with the file named
`/results/rxjs/frequencies_1.csv`).
