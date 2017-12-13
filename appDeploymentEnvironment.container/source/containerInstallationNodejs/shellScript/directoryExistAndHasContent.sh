# Run only when folders are empty:
# USAGE: if ! directoryExistAndHasContent "/folder"
directoryExistAndHasContent(){
    directory=$1
    [[ -d "$directory" ]] && [[ "$(ls -A $directory)" ]] ;
}
