if [ "$VERCEL_GIT_COMMIT_REF" != "main" ] && [ "$VERCEL_GIT_COMMIT_REF" != "dev" ]; then
  echo "Skipping deployment for branch $VERCEL_GIT_COMMIT_REF"
  exit 0
fi