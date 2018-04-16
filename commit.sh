# Push & Deploy of artifact
msg="Default Updated at `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi

# Just Commit
git commit -m "$msg"
echo -e "========================="
echo -e "Git commit is Completed"
echo -e "========================="
