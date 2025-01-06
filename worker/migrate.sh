#!/bin/zsh

# Initialize flags
suffix=""
reset=false

# Parse arguments
for arg in "$@"; do
    case $arg in
        remote)
            echo "Setting to migrate to remote database"
            suffix="--remote"
            ;;
        reset)
            echo "Setting to reset the database"
            reset=true
            ;;
        *)
            echo "Usage: $0 [remote] [reset]"
            exit 1
            ;;
    esac
done

# Define the base command parameters for database operations
db="english-tutoring"
db_command="d1 execute $db $suffix"

# Function to reset the database
reset_database() {
    echo "Resetting database..."
    # Use the db_command variable
    wrangler d1 execute $db $suffix --command "DROP TABLE IF EXISTS users;"
}

# Reset the database if the reset flag is true
if [ "$reset" = true ]; then
    reset_database
fi

# Loop through all SQL files in the migrations directory
for sql in migrations/*.sql; do
    echo "Executing migration: $sql"
    # Use the db_command variable
    wrangler d1 execute $db $suffix --file $sql
done
